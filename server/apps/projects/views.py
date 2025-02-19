from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from .models import Project, Category
from .serializers import ProjectSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.conf import settings




class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides the standard read-only actions
    to retrieve projects. It supports filtering by category (via the category slug),
    full-text search on title and description, and ordering.
    """
    queryset = Project.objects.select_related('category').prefetch_related('technologies').all()
    pagination_class = None
    serializer_class = ProjectSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['category__slug']
    # search_fields = ['title', 'description']
    # ordering_fields = ['created_at', 'title']
    # ordering = ['-created_at']


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that lists unique category names.
    It uses the CategorySerializer to serialize the category objects,
    then extracts only the 'name' field so the frontend receives a simple list of strings.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(projects__isnull=False).order_by('name').distinct()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Extract only the 'name' field from each serialized object.
        category_names = [item['name'] for item in serializer.data]
        return Response(category_names)
    


class ProjectSubmissionEmailView(APIView):
    """
    Accepts project submission data and sends it as an email.
    Expects a POST request with form-data including:
      - title
      - studentName
      - email
      - category
      - technologies
      - githubLink
      - description
      - image (optional file)
    """
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        # Extract data from POST
        title = request.data.get('title')
        student_name = request.data.get('studentName')
        sender_email = request.data.get('email')
        category = request.data.get('category')
        technologies = request.data.get('technologies')
        github_link = request.data.get('githubLink')
        description = request.data.get('description')
        image = request.FILES.get('image')

        # Compose email content
        subject = f"New Project Submission: {title}"
        body = (
            f"Project Title: {title}\n"
            f"Student Name: {student_name}\n"
            f"Email: {sender_email}\n"
            f"Category: {category}\n"
            f"Technologies: {technologies}\n"
            f"GitHub Link: {github_link}\n"
            f"Description: {description}\n"
        )

        # Use settings for email addresses if available, otherwise hardcode defaults.
        from_email = getattr(settings, "DEFAULT_FROM_EMAIL", settings.EMAIL_HOST_USER)
        # Set the recipient email address – you might configure this in your settings.
        to_email = [getattr(settings, "PROJECT_SUBMISSION_EMAIL", settings.EMAIL_HOST_USER)]

        email_message = EmailMessage(
            subject=subject,
            body=body,
            from_email=from_email,
            to=to_email,
        )

        # Attach image if provided
        if image:
            email_message.attach(image.name, image.read(), image.content_type)

        try:
            email_message.send()
            return Response({"message": "Project submitted successfully!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
