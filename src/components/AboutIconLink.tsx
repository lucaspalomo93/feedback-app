import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutIconLink = () => {
  return (
    <div className='about-link'>
      <Link to={'about'}>
        <FaQuestion />
      </Link>
    </div>
  );
};

export default AboutIconLink;
