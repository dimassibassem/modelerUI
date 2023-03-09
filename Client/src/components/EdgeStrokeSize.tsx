const EdgeStrokeSize = ({
                          edgeSize,
                          setEdgeSize
                        }: { edgeSize: number, setEdgeSize: (arg0: number) => void }) => (
  <div>
    <label htmlFor='size' className='ml-3 text-sm font-medium text-gray-900'>Stroke</label>
    <input
      type='range'
      className='transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200'
      id='size'
      min='1' max='6'
      value={edgeSize}
      onChange={(e) => {
        setEdgeSize(Number(e.target.value))
      }
      }
    />
  </div>
)
export default EdgeStrokeSize
