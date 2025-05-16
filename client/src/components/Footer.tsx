import { SiGithub } from 'react-icons/si';
const Footer = () => {
  return (
    <div id="footer">
      Coded by: <SiGithub />
      <strong>
        <a
          id="github-link"
          href="https://github.com/sleslief7/members_only"
          target="_blank"
        >
          Leslie Fernandez
        </a>
      </strong>
    </div>
  );
};

export default Footer;
