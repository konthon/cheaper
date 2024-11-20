import { Box, Grid, Text } from '@chakra-ui/react'
import { ComponentProps, FC } from 'react'
import { Drawer } from 'vaul'
import NumberButton from './parts/NumberButton'

interface Props {
  open: ComponentProps<typeof Drawer.Root>['open']
  onOpenChange: ComponentProps<typeof Drawer.Root>['onOpenChange']
}

const Calculator: FC<Props> = (props) => {
  const { open, onOpenChange } = props
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
                  fontSize='clamp(32px, 10vw, 48px)'
                  fontWeight='bold'
                >
                  123
                </Text>
              </Box>
            </Drawer.Description>
            <Grid
              templateColumns='repeat(4, 1fr)'
              gap={1}
              pt={2}
              pb='calc(env(safe-area-inset-bottom, 16px) + 8px)'
            >
              <NumberButton number='C' />
              <NumberButton number='×' />
              <NumberButton number='÷' />
              <NumberButton number='del' />

              <NumberButton number='7' />
              <NumberButton number='8' />
              <NumberButton number='9' />
              <NumberButton number='−' />

              <NumberButton number='4' />
              <NumberButton number='5' />
              <NumberButton number='6' />
              <NumberButton number='+' colorPalette='orange' />

              <NumberButton number='1' />
              <NumberButton number='2' />
              <NumberButton number='3' />
              <NumberButton number='=' boxSize='unset' gridRow='span 2' />

              <NumberButton number='0' />
              <NumberButton number='000' />
              <NumberButton number='.' />
            </Grid>
          </Grid>
        </Box>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Calculator
