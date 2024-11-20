import { Button, ButtonProps } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface Props extends ButtonProps {
  number: ReactNode
}

const NumberButton: FC<Props> = (props) => {
  const { number, ...restProps } = props
  return (
    <Button
      fontSize='160%'
      boxSize='clamp(40px, calc(50vmin / 5), 60px)'
      borderRadius='full'
      variant='plain'
      color='fg'
      backgroundColor='colorPalette.contrast'
      _hover={{
        backgroundColor: 'colorPalette.subtle',
        _active: {
          backgroundColor: 'colorPalette.emphasized',
        },
      }}
      {...restProps}
    >
      {number}
    </Button>
  )
}

export default NumberButton
