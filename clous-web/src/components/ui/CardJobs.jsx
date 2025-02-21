const Card = ({ title, value }) => {
  return (
    <div className=" rounded-2xl border border-dark-blue-greenish/5 p-4 mb-4 w-80">
      <h3 className="font-semibold mb-2">{title}</h3>
      <h3 className="text-4xl leading-none mb-1">{value}</h3>
      <span className="font-normal text-base">in the last 30 days</span>
    </div>
  );
};

export default Card;
