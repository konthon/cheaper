import { Box, Grid, Icon, Text } from '@chakra-ui/react'
import { ComponentProps, FC, useMemo, useState } from 'react'
import { LuDelete } from 'react-icons/lu'
import { Drawer } from 'vaul'

import NumberButton from './parts/NumberButton'

interface Props {
  open: ComponentProps<typeof Drawer.Root>['open']
  onOpenChange: ComponentProps<typeof Drawer.Root>['onOpenChange']
}

const Calculator: FC<Props> = (props) => {
  const { open, onOpenChange } = props

  const [value, setValue] = useState(0)
  const display = useMemo(() => {
    if (!value) {
      return '0'
    }
    return value.toLocaleString()
  }, [value])
  const onAddNumber = (number: number) => {
    setValue((currentValue) => currentValue * 10 + number)
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Box
          as={Drawer.Overlay}
          backgroundColor='blackAlpha.700'
          position='fixed'
          inset={0}
          zIndex='modal'
        />
        <Box
          as={Drawer.Content}
          backgroundColor='bg.muted'
          position='fixed'
          bottom={0}
          left={0}
          right={0}
          zIndex='modal'
          height='full'
          maxHeight='calc(100dvh - 20px)'
          borderTopRadius='lg'
        >
          <Grid
            height='full'
            width='fit-content'
            mx='auto'
            templateRows='auto 1fr auto'
          >
            <Box as={Drawer.Handle} my={2} />
            <Drawer.Title hidden>เครื่องคิดเลข</Drawer.Title>
            <Drawer.Description asChild>
              <Box display='flex' alignItems='flex-end' justifyContent='end'>
                <Text
                  as='span'
                  textAlign='end'
                  fontSize='6xl'
                  fontWeight='bold'
                >
                  {display}
                </Text>
              </Box>
            </Drawer.Description>
            <Grid
              templateColumns='repeat(4, 1fr)'
              gap={1}
              pt={2}
              pb='calc(env(safe-area-inset-bottom, 16px) + 8px)'
            >
              <NumberButton
                number='C'
                colorPalette='blackAlpha'
                onClick={() => {
                  setValue(0)
                }}
              />
              <NumberButton number='×' colorPalette='orange' />
              <NumberButton number='÷' colorPalette='orange' />
              <NumberButton
                number={
                  <Icon>
                    <LuDelete />
                  </Icon>
                }
                colorPalette='blackAlpha'
                onClick={() => {
                  setValue((currentValue) => {
                    const newValue = currentValue.toString()
                    if (newValue.length === 2 && newValue.charAt(0) === '-') {
                      return 0
                    }
                    return +newValue.slice(0, -1)
                  })
                }}
              />

              <NumberButton number='7' onClick={() => onAddNumber(7)} />
              <NumberButton number='8' onClick={() => onAddNumber(8)} />
              <NumberButton number='9' onClick={() => onAddNumber(9)} />
              <NumberButton number='−' colorPalette='orange' />

              <NumberButton number='4' onClick={() => onAddNumber(4)} />
              <NumberButton number='5' onClick={() => onAddNumber(5)} />
              <NumberButton number='6' onClick={() => onAddNumber(6)} />
              <NumberButton number='+' colorPalette='orange' />

              <NumberButton number='1' onClick={() => onAddNumber(1)} />
              <NumberButton number='2' onClick={() => onAddNumber(2)} />
              <NumberButton number='3' onClick={() => onAddNumber(3)} />
              <NumberButton
                number='='
                boxSize='unset'
                gridRow='span 2'
                colorPalette='red'
              />

              <NumberButton number='0' onClick={() => onAddNumber(0)} />
              <NumberButton
                number='000'
                onClick={() => {
                  setValue((currentValue) => currentValue * 1000)
                }}
              />
              <NumberButton number='.' />
            </Grid>
          </Grid>
        </Box>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Calculator
