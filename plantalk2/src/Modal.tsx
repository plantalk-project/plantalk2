import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Modal.css";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);

  };

  return (
    <div>
      <button onClick={() => handleOpen()}>abcdef</button>
      {isOpen && (
        <motion.div
          style={{ height: "60%" }}
          className="container"
          //初期状態は画面の外
          initial={{ y: "100%" }}
          //モーダルが開いているときは画面の中に表示
          animate={{ y: isOpen ? "0%" : "100%" }}
          //モーダルが閉じているときは画面の外に表示
          exit={{ y: "100%" }}
          //バネみたいなアニメーション
          transition={{
            stiffness: 300,
          }}
          //ドラックで閉じる
          drag="y"
          //topは制限なしbottomは100px
          dragConstraints={{ top: 0, bottom: 100 }}
          //ドラッグの反発力を0にする
          dragElastic={0}
          //ドラッグが終了した時
          onDragEnd={(_, info) => {
            //ドラッグが早かったら閉じる
            if (info.velocity.y > 100) setIsOpen(false);
            //ドラッグが下に100px以上移動したら閉じる
            if (info.offset.y > 100) setIsOpen(false);
          }}
        >
          <div className="dragHandle"> aaaa</div>
        </motion.div>
      )}
    </div>
  );
}

export default Modal;
