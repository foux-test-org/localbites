import React, { useState } from 'react';
import { TeamCard } from '../components/TeamCard/TeamCard';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Modal } from '../components/Modal/Modal';
import styles from './About.module.css';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former food critic turned tech entrepreneur. Sarah started LocalBites to help people discover amazing local restaurants.',
    color: '#E8600A',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Engineering',
    bio: 'Full-stack developer with a passion for building tools that connect communities through great food.',
    color: '#0277BD',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Design',
    bio: 'Award-winning UX designer who believes the best digital experiences feel as warm as a home-cooked meal.',
    color: '#7B1FA2',
  },
  {
    name: 'David Kim',
    role: 'Community Manager',
    bio: 'Food blogger and community builder. David curates restaurant partnerships and manages LocalBites events.',
    color: '#2E7D32',
  },
];

export function About(): React.ReactNode {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleContactSubmit(): void {
    setShowSuccessModal(true);
  }

  function handleCloseModal(): void {
    setShowSuccessModal(false);
  }

  return (
    <div>
      <section className={styles.heroBanner}>
        <h1 className={styles.heroTitle}>About LocalBites</h1>
        <p className={styles.heroDescription}>
          We're on a mission to connect food lovers with the best local restaurants
          in their neighborhoods.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.missionLayout}>
            <div className={styles.missionText}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.text}>
                LocalBites was born from a simple idea: everyone deserves to discover
                the incredible food that exists right in their own neighborhood. We
                believe that local restaurants are the heart and soul of a community,
                and we're here to help them thrive.
              </p>
              <p className={styles.text}>
                Our platform makes it easy to explore, compare, and fall in love with
                local eateries — from the family-owned taco shop around the corner to
                the hidden gem sushi bar you never knew existed.
              </p>
            </div>
            <div className={styles.missionIllustration} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                color={member.color}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <ContactForm onSubmit={handleContactSubmit} />
        </div>
      </section>

      {showSuccessModal ? (
        <Modal onClose={handleCloseModal}>
          <h2 className={styles.modalTitle}>Thanks for reaching out!</h2>
          <p className={styles.modalText}>
            We've received your message and will get back to you shortly.
          </p>
          <button className={styles.modalButton} onClick={handleCloseModal}>
            OK
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
