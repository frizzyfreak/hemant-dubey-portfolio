import React from "react";

interface MagnifyTextProps {
  text: string;
  className?: string;
}

const MagnifyText: React.FC<MagnifyTextProps> = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span className="inline-block transition-all duration-200 hover:scale-[1.15] hover:font-bold hover:tracking-wider hover:text-primary cursor-default">
            {word}
          </span>
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
};

export default MagnifyText;
