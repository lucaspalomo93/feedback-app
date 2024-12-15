interface HeaderProps {
  text: string;
  bgColor?: string;
}

const Header = ({ text }: HeaderProps) => {
  const headerStyles = {
    backgroundColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95'
  };
  return (
    <header style={headerStyles}>
      <div className='container'>
        <h2>Feedback UI {text}</h2>
      </div>
    </header>
  );
};

export default Header;
