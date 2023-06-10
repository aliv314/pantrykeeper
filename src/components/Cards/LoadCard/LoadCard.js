import "./LoadCard.scss";

const LoadCard = (props) => {
  const {
    additionalClass,
  } = props;
  return (
    <>
    
      <div className={`load-card ${additionalClass}`}>
        <div className="load-card__body">
        <h2 className="load-card__title"> Loading </h2>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
      </div>
    </>
  );
};

export default LoadCard;
