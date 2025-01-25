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
      <h1 className="font-title-lg">font-title-lg</h1>
      <h1 className="font-title-md">font-title-md</h1>
      <h1 className="font-title-sm">font-title-sm</h1>
      <h1 className="font-subtitle">font-subtitle</h1>
      <h1 className="font-body-md">font-body-md</h1>
      <h1 className="font-body-sm">font-body-sm</h1>
      <h1 className="font-body-xs">font-body-xs</h1>
      <h1 className="font-label-md">font-label-md</h1>
      <h1 className="font-label-sm">font-label-sm</h1>
      <h1 className="font-action-md">font-action-md</h1>
      <h1 className="font-action-sm">font-action-sm</h1>
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
