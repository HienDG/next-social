import { useCallback } from "react";
import { useRecoilState, useResetRecoilState, atom } from "recoil";

type ModalView = "loading";

interface ModalState {
	view: ModalView;
	isOpen: boolean;
}

const modalState = atom<ModalState>({
	key: "modalState",
	default: {
		view: "loading",
		isOpen: false,
	},
});

const useModal = () => {
	const [modal, setModal] = useRecoilState(modalState);
	const resetModal = useResetRecoilState(modalState);

	const onOpen = useCallback(
		(view: ModalView) => {
			return setModal(() => ({ isOpen: true, view }));
		},
		[setModal],
	);

	const onClose = useCallback(() => {
		return setModal((prev) => ({ ...prev, isOpen: false }));
	}, [setModal]);

	const reset = useCallback(() => {
		return resetModal();
	}, [resetModal]);

	return {
		...modal,
		onClose,
		onOpen,
		reset,
	};
};

export default useModal;
