import { Button, ButtonProps } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface Props extends ButtonProps {
  number: ReactNode
}

const NumberButton: FC<Props> = (props) => {
  const { number, colorPalette, ...restProps } = props
  const hasColorPalette = !!colorPalette
  return (
    <Button
      fontSize='160%'
      boxSize={{
        base: 'calc(100vmin / 4 - 16px)',
        sm: 'clamp(40px, calc(50vmin / 5), 60px)',
      }}
      borderRadius='full'
      variant='plain'
      colorPalette={colorPalette}
      color='fg'
      backgroundColor='colorPalette.contrast'
      _hover={{
        backgroundColor: 'colorPalette.subtle',
        _active: {
          backgroundColor: 'colorPalette.emphasized',
        },
      }}
      data-color={hasColorPalette}
      css={{
        '&[data-color="true"]': {
          color: 'colorPalette.contrast',
          backgroundColor: 'colorPalette.solid',
          _hover: {
            backgroundColor: 'colorPalette.emphasized',
            _active: {
              color: 'colorPalette.fg',
              backgroundColor: 'colorPalette.subtle',
            },
          },
        },
      }}
      {...restProps}
    >
      {number}
    </Button>
  )
}

export default NumberButton
