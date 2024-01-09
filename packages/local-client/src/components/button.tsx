interface ButtonProps {
	className?: string;
	onClick: () => any;
	text?: string;
	rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	className,
	onClick,
	text,
	rounded,
}) => {
	return (
		<button
			onClick={() => onClick()}
			className={`button is-primary is-small ${rounded && 'is-rounded'}`}
		>
			<span className='icon'>
				<i className={'fas ' + className}></i>
			</span>
			{text}
		</button>
	);
};

export default Button;
