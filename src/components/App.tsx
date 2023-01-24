import React, { useEffect, useRef, useState } from 'react'

type Props = {
  styles?: React.CSSProperties
  clockwise?: boolean
  shiftSnap?: number
  snap?: number
  min?: number
  value?: number
  onChange?: (val: number) => null
  handleValueChange?: (val: number) => null
  label?: boolean
}

export default function NuAnglePicker({
  styles: customStyles = {},
  clockwise = true,
  shiftSnap = 15,
  snap = 1,
  min = 0,
  value = 0,
  onChange,
  handleValueChange,
  label = true,
}: Props) {
  const [simpleVal, setSimpleVal] = useState(value)
  const nuRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLLabelElement | null>(null)
  const refProp = useRef<any>({
    value,
    startOffset: {
      y: 0,
      x: 0,
    },
  })

  const mouseDown = useRef<boolean>(false)

  const pointerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setDegrees(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nuRef.current])

  const styles: React.CSSProperties = {
    width: '50px',
    height: '50px',
    ...customStyles,
  }

  const handleMouseCapture = (event: React.MouseEvent) => {
    if (nuRef.current) {
      const offset = nuRef.current.getBoundingClientRect(),
        width = nuRef.current.clientWidth,
        height = nuRef.current.clientHeight

      refProp.current = {
        ...refProp.current,
        startOffset: {
          x: offset.left + width / 2,
          y: offset.top + height / 2,
        },
      }

      setEventDegrees(event)
      mouseDown.current = true
    }
  }

  const setEventDegrees = (event: React.MouseEvent) => {
    const refProps = refProp.current
    let opposite = refProps.startOffset.y - event.pageY
    opposite = clockwise ? opposite : -opposite

    const adjacent = event.pageX - refProps.startOffset.x,
      radians = Math.atan(opposite / adjacent)

    let degrees = Math.round(radians * (180 / Math.PI))

    if (event.shiftKey) {
      degrees = roundToMultiple(degrees, shiftSnap)
    } else {
      degrees = roundToMultiple(degrees, snap)
    }

    if (adjacent < 0 && opposite >= 0) {
      degrees += 180
    } else if (opposite < 0 && adjacent < 0) {
      degrees -= 180
    }

    setDegrees(degrees)
  }

  const setDegrees = function (degrees: number) {
    refProp.current.value = clamp(degrees)
    drawRotation()
  }

  const clamp = (degrees: number) => {
    if (typeof degrees !== 'number') {
      degrees = parseInt(degrees, 10)
      if (isNaN(degrees)) {
        degrees = 0
      }
    }

    const max = min + 360

    while (degrees < min) {
      degrees += 360
    }
    while (degrees > max) {
      degrees -= 360
    }

    return degrees
  }

  const roundToMultiple = (number: number, multiple: number) => {
    const value = number / multiple,
      integer = Math.floor(value),
      rest = value - integer

    return rest > 0.5 ? (integer + 1) * multiple : integer * multiple
  }

  const drawRotation = () => {
    const props = refProp.current

    const tempValue = clockwise ? props.value : -props.value
    const rotation = 'rotate(' + -tempValue + 'deg)'
    refProp.current.value = tempValue
    labelRef.current && (labelRef.current.innerText = tempValue)
    handleValueChange && handleValueChange(tempValue)
    if (pointerRef.current)
      pointerRef.current.style.cssText = `
				-webkit-transform: ${rotation};
				-moz-transform: ${rotation};
				-ms-transform: ${rotation};
				-o-transform: ${rotation};
				transform: ${rotation};
			}`
  }

  return (
    <>
      {/* styles */}
      <style>{`
.nu-anglepicker {
  background: #dbdbdb;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2RiZGJkYiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjIwJSIgc3RvcC1jb2xvcj0iI2UxZTFkZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmOGY4ZjMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  background: -moz-linear-gradient(top, #dbdbdb 0%, #e1e1de 20%, #f8f8f3 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #dbdbdb), color-stop(20%, #e1e1de), color-stop(100%, #f8f8f3));
  background: -webkit-linear-gradient(top, #dbdbdb 0%, #e1e1de 20%, #f8f8f3 100%);
  background: -o-linear-gradient(top, #dbdbdb 0%, #e1e1de 20%, #f8f8f3 100%);
  background: -ms-linear-gradient(top, #dbdbdb 0%, #e1e1de 20%, #f8f8f3 100%);
  background: linear-gradient(to bottom, #dbdbdb 0%, #e1e1de 20%, #f8f8f3 100%);
  border: 2px solid #666;
  -moz-box-shadow: inset 0 2px 3px white, inset 0 -1px 2px #fffef8;
  -webkit-box-shadow: inset 0 2px 3px white, inset 0 -1px 2px #fffef8;
  box-shadow: inset 0 2px 3px white, inset 0 -1px 2px #fffef8;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}


.nu-anglepciker-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  margin: -2px 0 0 -2px;
  -moz-transform-origin: 2px 2px;
  -webkit-transform-origin: 2px 2px;
  -ms-transform-origin: 2px 2px;
  -o-transform-origin: 2px 2px;
  transform-origin: 2px 2px;
}

.nu-anglepicker-center-circle{
  height: 4px;
  width: 4px;
  position: absolute;
  background: #838383;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.nu-anglepicker-line{
  margin-top: 1.5px;
  margin-right: -2px;
  height: 1px;
  background: #838383;
}


.nu-anglepicker-dragging .nu-anglepicker-dot, .nu-anglepicker-dragging .nu-anglepicker-line, .nu-anglepicker:hover .nu-anglepicker-dot, .nu-anglepicker:hover .nu-anglepicker-line {
  background: #494949;
}


.nu-anglepicker:hover, .nu-anglepicker.nu-anglepicker-dragging {
  border-color: #494949;
}
.nu-anglepicker-val-label{
  font-size: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    margin-left: 2px;
    pointer-events: none;
}
`}</style>
      <div
        style={styles}
        ref={nuRef}
        className='nu-anglepicker'
        onMouseDownCapture={handleMouseCapture}
        onMouseMove={(event: React.MouseEvent) => {
          if (mouseDown.current) {
            setEventDegrees(event)
            nuRef.current?.classList.add('nu-anglepicker-dragging')
          }
        }}
        onMouseUpCapture={(event) => {
          setEventDegrees(event)
          mouseDown.current = false
          setSimpleVal(refProp.current.value)
          onChange && onChange(refProp.current.value as number)
          nuRef.current?.classList.remove('nu-anglepicker-dragging')
        }}
        onDrag={setEventDegrees}
      >
        <div className='nu-anglepciker-pointer' ref={pointerRef}>
          <div>
            <div className='nu-anglepicker-center-circle'></div>
            <div className='nu-anglepicker-line'></div>
            {label && (
              <div className='nu-anglepicker-val-label'>
                <label ref={labelRef}>{refProp.current.value}</label>°
              </div>
            )}
          </div>
        </div>
      </div>
      <div>Value: {refProp.current.value ?? simpleVal} deg</div>
    </>
  )
}
