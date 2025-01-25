import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  const colors = [
    'bg-orange-base',
    'bg-orange-dark',
    'bg-blue-light',
    'bg-blue-base',
    'bg-blue-dark',
    'bg-white',
    'bg-background',
    'bg-shape',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-danger',
    'bg-success',
  ]

  return (
    <>
      <Helmet title="Dashboard" />
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {colors.map((color) => (
          <div key={color}>
            {color}
            <div
              className={`${color} flex h-16 w-32 items-center justify-center rounded-lg font-bold`}
            ></div>
          </div>
        ))}
      </div>
    </>
  )
}
