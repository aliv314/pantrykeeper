import "./LoadCard.scss";

const LoadCard = (props) => {
  return (
    <>
      <div className={`load-card`}>
        <div className="load-card__body">
          <p className="load-card__title"> Loading </p>
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
