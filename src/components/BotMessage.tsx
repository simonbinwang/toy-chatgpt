import React, { useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

interface BotMessageProps {
  message: string;
  isCompleted: boolean;
}

export const BotMessage = (props: BotMessageProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<BotMessageProps>(props);

  useEffect(() => {
    ref.current = props;
  }, [props]);

  useEffect(() => {
    function typingEffect(delay = 10) {
      return new Promise((resolve) => {
        let currentText = "";
        let index = 0;

        function type() {
          const text = ref.current.message;
          const isCompleted = ref.current.isCompleted;
          const element = divRef.current;
          if (element && index < text.length) {
            currentText += text.substring(index, index + 3);
            element.innerHTML = marked.parse(currentText); // Update the content using the marked library
            index += 3;
            setTimeout(type, delay);
          } else if (!isCompleted) {
            setTimeout(type, delay);
          } else {
            resolve("done");
          }
        }

        type();
      });
    }
    typingEffect();
  }, []);

  return <div ref={divRef} />;
};
