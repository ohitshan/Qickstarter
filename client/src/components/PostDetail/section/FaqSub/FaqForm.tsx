import React from "react";

interface questionProps {
  question: {
    id: number;
    content: string;
    from: { authUser: { email: string } };
  };
}

function FaqForm({ question }: questionProps) {
  console.log(question);
  return (
    <div
      style={{ border: "1px solid #D9D9D9", margin: "15px 0", padding: "20px" }}
    >
      <h3>{question.from.authUser.email}</h3>
      <hr />
      <p>{question.content}</p>
    </div>
  );
}

export default FaqForm;
