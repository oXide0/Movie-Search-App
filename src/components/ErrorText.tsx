interface ErrorTextProps {
	children: string;
}

function ErrorText({ children }: ErrorTextProps) {
	return <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: '600', paddingTop: '60px' }}>{children}</h1>;
}

export default ErrorText;
