import "./index.css";

const CastCard = (props) => {
  const { castDetails } = props;
  const { characterName, name, profile } = castDetails;
  return (
    <li className="profile-container">
      <img
        className="profile-img"
        src={`https://image.tmdb.org/t/p/w500${profile}`}
        alt="profile"
      />
      <p className="name">{name}</p>
      <p className="character-name">Character: {characterName}</p>
    </li>
  );
};

export default CastCard;
