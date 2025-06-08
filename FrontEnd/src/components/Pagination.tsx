import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from '../types/scientist.type'

interface PaginationProps {
  totalPages: number
  currentPage: number
  queryConfig: QueryConfig
}

const Pagination = ({ totalPages, currentPage, queryConfig }: PaginationProps) => {
  const generatePages = (): (number | string)[] => {
    const delta = 2
    const pages: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }

    return pages
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {generatePages().map((item, index) => {
        if (item === '...') {
          return (
            <span key={index} className="px-3 py-2 text-gray-500 select-none">
              ...
            </span>
          )
        }

        return (
          <Link
            key={item}
            to={{
              pathname: '/scientists',
              search: createSearchParams({
                ...queryConfig,
                page: item.toString()
              }).toString()
            }}
            className={`px-4 py-2 border rounded text-sm font-medium ${
              currentPage === item ? 'bg-slate-500 text-white' : 'text-black hover:bg-gray-100'
            }`}>
            {item}
          </Link>
        )
      })}
    </div>
  )
}

export default Pagination
