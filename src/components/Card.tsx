interface CardProps {
  title: string;
  content: string;
}
const Card = ({ title, content }: CardProps) => {
  return (
    <div class={"card"}>
      <h2 class={"card-title"}>{title}</h2>
      <p class={"card-content"}>{content}</p>
    </div>
  );
};
export default Card;
