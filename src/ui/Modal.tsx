import { ReactNode, useState, useMemo, useContext, cloneElement, ReactElement, createContext } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

const ModalContext = createContext<ModalContextType | object>({});

interface BasePropsType {
	children: ReactNode;
}

interface ModalOpenPropsType extends BasePropsType {
	opens: string;
}

interface ModalWindowPropsType extends BasePropsType {
	name: string;
}

type ModalContextType = {
	openName?: string;
	close?: () => void;
	open?: (name: string) => void;
};
const Modal = ({ children }: BasePropsType) => {
	const [openName, setOpenName] = useState<string>("");
	const close = () => setOpenName("");
	const open = setOpenName;

	const value = useMemo(() => {
		return {
			openName,
			close,
			open,
		};
	}, [open, openName]);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

const Open = ({ children, opens: opensWindowName }: ModalOpenPropsType) => {
	const { open } = useContext<ModalContextType>(ModalContext);

	return cloneElement(children as ReactElement, { onClick: () => open?.(opensWindowName) });
};

const Window = ({ children, name }: ModalWindowPropsType) => {
	const { openName, close } = useContext<ModalContextType>(ModalContext);
	const ref = useOutsideClick<HTMLDivElement>(close);
	if (name !== openName) {
		return null;
	}

	return createPortal(
		<div className="bg-[rgba(255, 255, 255, 0.1)] fixed inset-0 z-30 h-[100dvh] w-full backdrop-blur-md transition-all duration-300">
			<div
				ref={ref}
				className="px-13 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[9px] bg-[#fff] py-[1.5rem] transition-all duration-300"
			>
				<button className="absolute right-8 top-5 translate-x-3 rounded-md border-none bg-transparent p-2 transition-all duration-300" onClick={close}>
					<HiXMark />
				</button>
				<div>{cloneElement(children as ReactElement, { onCloseModal: close })}</div>
			</div>
		</div>,
		document.body,
		"Modal",
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
