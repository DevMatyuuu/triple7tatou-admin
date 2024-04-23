import { HiHome } from "react-icons/hi2";
import { PiNeedleFill } from "react-icons/pi";
import { GiEarrings } from "react-icons/gi";

export const sidebarLinks = [
  {
    id: 1,
    label: 'Home',
    route: '/',
    icon: <HiHome className="lg:size-8"/>,
  },
  {
    id: 2,
    label: 'Tattoos',
    route: '/',
    icon: <PiNeedleFill className="lg:size-8"/>,
  },
  {
    id: 3,
    label: 'Piercings',
    route: '/',
    icon: <GiEarrings className="lg:size-8"/>,
  },
  {
    id: 4,
    label: 'Home',
    route: '/',
    icon: <HiHome className="lg:size-8"/>,
  },
]