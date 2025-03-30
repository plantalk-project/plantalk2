import { motion } from "framer-motion";
import "./Modal.css";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../../atoms/isModal";
import Diary from "./Diary";

function Modal() {
  const [modalOpen, isModalOpen] = useAtom(modalWindowAtom);
  const setModalOpen = (value: boolean) => {
    isModalOpen(value);
  };

  return (
    <div className="modal-container">
      {modalOpen ? (
        <motion.div
        /////////////////////高さ
          style={{ height: "60%" }}
          className="container"
          //初期状態は画面の外
          initial={{ y: "100%" }}
          //モーダルが開いているときは画面の中に表示
          animate={{ y: modalOpen ? "0%" : "100%" }}
          //モーダルが閉じているときは画面の外に表示
          exit={{ y: "100%" }}
          //バネみたいなアニメーション
          transition={{
            stiffness: 300,
          }}
          //ドラックで閉じる
          drag="y"
          //topは制限なしbottomは100px
          dragConstraints={{ top: 0, bottom: "100%" }}
          //ドラッグの反発力を0にする
          dragElastic={0}
          //ドラッグが終了した時
          onDragEnd={(_, info) => {
            //ドラッグが早かったら閉じる
            if (info.velocity.y > 100) isModalOpen(false);
            //ドラッグが下に100px以上移動したら閉じる
            if (info.offset.y > 100) isModalOpen(false);
          }}
        >
          <Diary modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Modal;
