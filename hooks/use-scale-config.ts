"use client"

import { useMemo } from "react"
import { useQueryStates } from "nuqs"
import { searchParamsParsers, configFromParams } from "@/lib/search-params"
import { generateScale } from "@/lib/scale"
import type { ScaleConfig, ScaleEntry } from "@/lib/scale"

export function useScaleConfig() {
  const [params, setParams] = useQueryStates(searchParamsParsers)

  const config: ScaleConfig = useMemo(
    () => configFromParams(params),
    [params]
  )

  const entries: ScaleEntry[] = useMemo(
    () => generateScale(config),
    [config]
  )

  return {
    params,
    setParams,
    config,
    entries,
  }
}
