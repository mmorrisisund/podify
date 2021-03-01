import { useEffect } from 'react'

export const useImportScript = url => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = url
    script.async = true
    document.body.appendChild(script)

    return () => document.body.removeChild(script)
  }, [url])
}
