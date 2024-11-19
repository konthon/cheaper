import {
  Badge,
  Box,
  Button,
  Container,
  FormatNumber,
  Heading,
  HStack,
  NumberInput,
  Stat,
  Table,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'

import { ColorModeButton } from './components/ui/color-mode'
import { LuPlus } from 'react-icons/lu'

interface Item {
  unit?: number
  size?: number
  price: number
}

const initialItems: Record<number, Item> = { 0: { price: 0 }, 1: { price: 0 } }

function App() {
  const [items, setItems] = useState(initialItems)

  const cheapestIndex = useMemo(() => {
    const arr = Object.values(items)
    if (arr.length < 2) return undefined
    const sum = arr.map((item) =>
      !Number.isNaN(+item.price)
        ? ((item.unit || 1) * (item.size || 0)) / item.price
        : 0,
    )
    if (!sum[0] || !sum[1]) return undefined
    return sum.indexOf(Math.max(...sum))
  }, [items])

  return (
    <>
      <Box
        as='header'
        py={4}
        colorPalette='blue'
        bgGradient='to-b'
        gradientFrom={{ base: 'colorPalette.300', _dark: 'colorPalette.800' }}
        gradientTo='transparent'
      >
        <Container maxWidth='breakpoint-md'>
          <HStack>
            <Heading as='h1' flexGrow={1}>
              🛍️ ชิ้นไหนถูกกว่า
            </Heading>
            <ColorModeButton />
          </HStack>
        </Container>
      </Box>
      <Container maxWidth='breakpoint-md'>
        <HStack mt={4}>
          <Box flexGrow={1} />
          <Button
            colorPalette='blue'
            variant='outline'
            onClick={() => {
              setItems(initialItems)
            }}
          >
            คืนค่าเริ่มต้น
          </Button>
        </HStack>
        <Table.Root stickyHeader>
          <Table.Header>
            <Table.Row
              backgroundColor='whiteAlpha.700'
              backdropFilter='blur(20px)'
              _dark={{ backgroundColor: 'blackAlpha.300' }}
            >
              <Table.ColumnHeader>จำนวน</Table.ColumnHeader>
              <Table.ColumnHeader>ขนาด</Table.ColumnHeader>
              <Table.ColumnHeader>ราคา</Table.ColumnHeader>
              <Table.ColumnHeader />
            </Table.Row>
          </Table.Header>
          <Table.Body colorPalette='blue'>
            {Object.entries(items).map(([, item], index) => (
              <Table.Row
                key={index}
                aria-current={index === cheapestIndex ? 'page' : undefined}
                _currentPage={{ backgroundColor: 'green.emphasized' }}
              >
                <Table.Cell>
                  <NumberInput.Root
                    variant='subtle'
                    min={0}
                    step={1}
                    inputMode='numeric'
                    value={
                      typeof item.unit === 'undefined'
                        ? item.unit
                        : `${item.unit}`
                    }
                    onValueChange={(e) => {
                      setItems((curr) => {
                        const newCurr: Record<number, Item> = {
                          ...curr,
                          [index]: {
                            ...item,
                            unit: e.value ? e.valueAsNumber : undefined,
                          },
                        }
                        return newCurr
                      })
                    }}
                  >
                    <NumberInput.Input maxWidth='6ch' placeholder='1' />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell>
                  <NumberInput.Root
                    variant='subtle'
                    min={0}
                    value={
                      typeof item.size === 'undefined'
                        ? item.size
                        : `${item.size}`
                    }
                    onValueChange={(e) => {
                      setItems((curr) => {
                        const newCurr: Record<number, Item> = {
                          ...curr,
                          [index]: {
                            ...item,
                            size: e.value ? e.valueAsNumber : undefined,
                          },
                        }
                        return newCurr
                      })
                    }}
                  >
                    <NumberInput.Input maxWidth='100px' />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell>
                  <NumberInput.Root
                    variant='subtle'
                    min={0}
                    step={0.01}
                    formatOptions={{
                      maximumFractionDigits: 2,
                    }}
                    value={`${item.price}`}
                    onValueChange={(e) => {
                      let newPrice = 0
                      if (e.value.endsWith('.'))
                        newPrice = e.value as unknown as number
                      else if (e.value) newPrice = e.valueAsNumber

                      setItems((curr) => {
                        const newCurr: Record<number, Item> = {
                          ...curr,
                          [index]: {
                            ...item,
                            price: newPrice,
                          },
                        }
                        return newCurr
                      })
                    }}
                  >
                    <NumberInput.Input maxWidth='100px' />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell>
                  {typeof cheapestIndex === 'number' &&
                    cheapestIndex !== index && (
                      <Stat.Root colorPalette='red'>
                        <Badge maxWidth='fit-content'>
                          <Stat.UpIndicator color='colorPalette.solid' />
                          <FormatNumber
                            value={
                              ((items[cheapestIndex].unit || 1) *
                                (items[cheapestIndex].size || 0)) /
                                items[cheapestIndex].price /
                                (((item.unit || 1) * (item.size || 0)) /
                                  item.price) -
                              1
                            }
                            style='percent'
                          />
                        </Badge>
                      </Stat.Root>
                    )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Button
          width='full'
          colorPalette='yellow'
          variant='surface'
          onClick={() => {
            setItems((curr) => ({
              ...curr,
              [Object.keys(curr).length]: { price: 0 },
            }))
          }}
        >
          <LuPlus /> เพิ่มชิ้น
        </Button>
      </Container>
    </>
  )
}

export default App
