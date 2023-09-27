import React from "react";
function Main(props) {
  if (!props.astronomyData) return <h3>Yükleniyor...</h3>;
  const { title, date, explanation, media_type, url } = props.astronomyData;

  return (
    <>
      <h1>{title}</h1>
      <span>{date}</span>
      <p>{explanation}</p>
      <span>{media_type}</span>
      <img src={url} alt={title} />
    </>
  );
}
export default Main;
