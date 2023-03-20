import { Breadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { ItemResponse } from '../types'

interface BreadCrumbProps {
  searchedItems: ItemResponse[] | undefined
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ searchedItems }) => {
  return (
    <Breadcrumb
      separator=">"
      items={
        searchedItems &&
        (searchedItems[0]?.categories?.map((category: string) => {
          return { title: category }
        }) as unknown as ItemType[])
      }
    />
  )
}
