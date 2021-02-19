import defaultProfile from './defaultProfile.json'
import { ProfileLoader } from './ProfileLoader'
import { Profile } from './ProfileLoader.interface'

new ProfileLoader((defaultProfile as any) as Profile, 1).load()
