export interface LookupOption {
    id: number
    label: string
}

export const CAMPUSES: readonly LookupOption[] = [
    { id: 1, label: 'Tunja (Central)' },
    { id: 2, label: 'Duitama' },
    { id: 3, label: 'Sogamoso' },
    { id: 4, label: 'Chiquinquirá' },
] as const

export const UNIVERSITIES: readonly LookupOption[] = [
    { id: 1, label: 'UPTC' },
] as const
