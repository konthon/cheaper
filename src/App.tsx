import {
  Badge,
  Box,
  Button,
  Container,
  FormatNumber,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberInput,
  Spacer,
  Stat,
  Table,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { Calculator } from '@/components/Calculator'
import { ColorModeButton } from '@/components/ui/color-mode'

interface Item {
  unit?: number
  size?: number
  price: number
}

const initialItems: Record<number, Item> = { 0: { price: 0 }, 1: { price: 0 } }

function App() {
  const [openCalculator, setOpenCalculator] = useState(false)
  const [items, setItems] = useState(initialItems)

  const cheapestIndex = useMemo(() => {
    const arr = Object.values(items)
    if (arr.length < 2) return undefined
    const sum = arr.map((item) =>
      !Number.isNaN(+item.price) && +item.price
        ? ((item?.unit || 1) * (item?.size || 0)) / item.price
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
            <Spacer />
            <IconButton asChild variant='ghost' aria-label='GitHub repository'>
              <a href='https://github.com/konthon/cheaper'>
                <Icon fill='current' asChild>
                  <svg aria-hidden='true' viewBox='0 0 24 24'>
                    <path d='M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z'></path>
                  </svg>
                </Icon>
              </a>
            </IconButton>
            <ColorModeButton />
          </HStack>
        </Container>
      </Box>
      <Container maxWidth='breakpoint-md'>
        <HStack mt={4}>
          <Button
            disabled
            onClick={() => {
              setOpenCalculator(true)
            }}
          >
            เครื่องคิดเลข (เร็วๆนี้)
          </Button>
          <Box flexGrow={1} />
          <Button
            colorPalette='blue'
            variant='outline'
            onClick={() => {
              setItems(initialItems)
            }}
          >
            ล้างทั้งหมด
          </Button>
        </HStack>
        <Table.Root stickyHeader>
          <Table.Header>
            <Table.Row
              backgroundColor='whiteAlpha.700'
              backdropFilter='blur(20px)'
              _dark={{ backgroundColor: 'blackAlpha.300' }}
            >
              <Table.ColumnHeader width='1%' whiteSpace='nowrap'>
                จำนวน
              </Table.ColumnHeader>
              <Table.ColumnHeader>ขนาด</Table.ColumnHeader>
              <Table.ColumnHeader>ราคา</Table.ColumnHeader>
              <Table.ColumnHeader />
            </Table.Row>
          </Table.Header>
          <Table.Body colorPalette='blue'>
            {Object.entries(items).map(([key, item], index) => (
              <Table.Row
                key={key}
                aria-current={index === cheapestIndex ? 'page' : undefined}
                _currentPage={{ backgroundColor: 'green.emphasized' }}
              >
                <Table.Cell width='1%' whiteSpace='nowrap'>
                  <NumberInput.Root
                    variant='subtle'
                    min={0}
                    step={1}
                    inputMode='numeric'
                    value={
                      typeof item.unit === 'undefined' ? '' : `${item.unit}`
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
                    <NumberInput.Input
                      width='5ch'
                      placeholder='1'
                      fontSize='md'
                    />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell>
                  <NumberInput.Root
                    variant='subtle'
                    min={0}
                    value={
                      typeof item.size === 'undefined' ? '' : `${item.size}`
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
                    <NumberInput.Input fontSize='md' />
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
                    <NumberInput.Input
                      fontSize='md'
                      onFocus={(e) => e.target.select()}
                    />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell>
                  {typeof cheapestIndex === 'number' &&
                    cheapestIndex !== index &&
                    !!item.size &&
                    !!item.price && (
                      <Stat.Root colorPalette='red'>
                        <Badge maxWidth='fit-content'>
                          <Stat.UpIndicator color='colorPalette.solid' />
                          <FormatNumber
                            value={
                              item.price
                                ? ((items[cheapestIndex]?.unit || 1) *
                                    (items[cheapestIndex]?.size || 0)) /
                                    items[cheapestIndex]?.price /
                                    (((item.unit || 1) * (item.size || 0)) /
                                      item.price) -
                                  1
                                : 0
                            }
                            style='percent'
                            notation='compact'
                            maximumFractionDigits={2}
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

      <Calculator open={openCalculator} onOpenChange={setOpenCalculator} />
    </>
  )
}

export default App
