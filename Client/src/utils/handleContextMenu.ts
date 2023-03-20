import { ItemParams } from 'react-contexify'
import { MouseEvent } from 'react'

export const handleItemClick = ({ id, event, props }: ItemParams) => {
  switch (id) {
    case 'copy':
      console.log(event, props)
      break
    case 'cut':
      console.log(event, props)
      break
    default:
  }
}

export const handleContextMenu = (event: MouseEvent, show: (params: {
                                    event: MouseEvent, props: { [key: string]: any }
                                  }) => void
) => {
  show({
    event,
    props: {
      key: 'value'
    }
  })
}
