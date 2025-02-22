import React from 'react';
import styles from '../../pages/AboutPage.module.css';
import { FaLinkedin, FaTwitter, FaGithub, FaQuora } from 'react-icons/fa';

function TeamMember({ name, role, image, bio, socials }) {
  return (
    <div className={styles.teamMember}>
      <div className={styles.memberImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{name}</h3>
        <p className={styles.memberRole}>{role}</p>
        <p className={styles.memberBio}>{bio}</p>
        <div className={styles.socialLinks}>
          {socials.map((social, index) => {
            let IconComponent;
            switch (social.platform.toLowerCase()) {
              case 'linkedin':
                IconComponent = FaLinkedin;
                break;
              case 'twitter':
                IconComponent = FaTwitter;
                break;
              case 'github':
                IconComponent = FaGithub;
                break;
                case 'quora':
                  IconComponent = FaQuora;
                  break;
              default:
                IconComponent = null;
            }
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {IconComponent && <IconComponent className={styles.socialIcon} />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
