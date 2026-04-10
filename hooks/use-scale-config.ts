"use client"

import { useMemo } from "react"
import { useQueryStates } from "nuqs"
import { searchParamsParsers, configFromParams } from "@/lib/search-params"
import { generateScale } from "@/lib/scale"
import type { ScaleConfig, ScaleEntry } from "@/lib/scale"

export function useScaleConfig() {
  const [params, setParams] = useQueryStates(searchParamsParsers)

  const { config, entries } = useMemo<{
    config: ScaleConfig
    entries: ScaleEntry[]
  }>(() => {
    const c = configFromParams(params)
    return { config: c, entries: generateScale(c) }
  }, [params.base, params.ratio, params.neg, params.pos, params.round])

  return {
    params,
    setParams,
    config,
    entries,
  }
}
