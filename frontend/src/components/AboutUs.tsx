import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
  github: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. John Doe",
    designation: "Supervisor",
    image: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff&size=200",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Jane Smith",
    designation: "Team Lead",
    image: "https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=200",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Mike Johnson",
    designation: "ML Engineer",
    image: "https://ui-avatars.com/api/?name=Mike+Johnson&background=6366f1&color=fff&size=200",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Sarah Williams",
    designation: "Frontend Developer",
    image: "https://ui-avatars.com/api/?name=Sarah+Williams&background=8b5cf6&color=fff&size=200",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Alex Brown",
    designation: "Backend Developer",
    image: "https://ui-avatars.com/api/?name=Alex+Brown&background=6366f1&color=fff&size=200",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
  >
    <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-indigo-500 to-purple-500">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-indigo-900 font-display">{member.name}</h3>
      <p className="text-indigo-600 mb-4 font-medium">{member.designation}</p>
      <div className="flex space-x-4">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  </motion.div>
);

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center mb-12 text-indigo-900 font-display"
        >
          Meet Our Team
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs; 