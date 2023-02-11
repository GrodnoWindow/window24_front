import { memo } from 'react';

type Props = {
	text: string;
	aligning: string
}

export const PageHeader = memo((props: Props) => {
	const { text, aligning } = props;
  return (
	  <h1 className={`pt-[1em] text-${aligning} text-3xl font-semibold text-accent`}>
		  {text}
	 </h1>
  )
})
