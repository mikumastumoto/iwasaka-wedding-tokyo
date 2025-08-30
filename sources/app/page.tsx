import Countdown from "@/components/Countdown";
import Info from "@/components/Info";
import WeddingForm from '@/components/WeddingForm';
import Message from "@/components/Message";
import Main from "@/components/Main";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <Main />
      <Message/>
      <Profile/>
      <Countdown />
      <Info />
      <WeddingForm />
    </main>
  );
}

