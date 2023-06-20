"use client"

import { ChatArea } from "@/components/ChatArea";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SidebarButton } from "@/components/SidebarButton";
import { SidebarChatButton } from "@/components/SidebarChatButton";
import { Chat } from "@/types/Chat";
import { openai } from "@/utils/openai";
import { use, useEffect, useState } from "react";
import { v4 as uuidv4} from 'uuid';

const Page = () => {
  const [sideBarOpened, setSidebarOpened] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActive, setChatActive] = useState<Chat>();
  const [chatActiveId, setChatActiveId] = useState<string>('');
  const [AILoading, setAILoading] = useState(false);

  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if (AILoading) getAIResponse();
  }, [AILoading]);

  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);

  const getAIResponse = async () => {

      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      if (chatIndex > -1) {
        const response = await openai.generate(openai.translateMessages(chatListClone[chatIndex].messages));

        if (response) {
          chatListClone[chatIndex].messages.push({id: uuidv4(), author: 'ai', body: response});
        }
      }
      setChatList(chatListClone);
      setAILoading(false);

  }

  const handleClearConversations = () => {
    if (AILoading) return;

    setChatActiveId('');
    setChatList([]);
  };

  const handleNewChat = () => {
    if (AILoading) return;

    setChatActiveId('');
    closeSidebar();
  };

  const handleSendMessage = (message: string) => {
    if (!chatActiveId) {
      // Creating new chat
      let newCharId = uuidv4();

      setChatList([{
        id: newCharId,
        title: message,
        messages: [
          {id: uuidv4(), author: 'me', body: message}
        ]
      },...chatList])
      setChatActiveId(newCharId);
      } else {
        // Updating existing chat
        let chatListClone = [...chatList];
        let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
        chatListClone[chatIndex].messages.push({id: uuidv4(), author: 'me', body: message});
        setChatList(chatListClone);
    }

    setAILoading(true);
  };

  const handleSelectChat = (chatId: string) => {
    if (AILoading) return;

    let item = chatList.find(item => item.id === chatId);
    if (item) setChatActiveId(item.id);
    closeSidebar();
  };

  const handleEditChat = (chatId: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatId);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    if (AILoading) return;

    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === chatId);
    chatListClone.splice(chatIndex, 1);
    setChatList(chatListClone);
    setChatActiveId('');
  };

  const handleTestOpenAI = async () => {
    await openai.generate([
      {role: 'user', content: 'Qual a capital do Brasil?'}
    ]);
  };

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
      open={sideBarOpened}
      onClose={closeSidebar}
      onClear={handleClearConversations}
      onNewChat={handleNewChat}
      >
        {chatList.map(item => (
         <SidebarChatButton
          key={item.id}
          chatItem={item}
          active={item.id === chatActiveId}
          onClick={handleSelectChat}
          onDelete={handleDeleteChat}
          onEdit={handleEditChat}
         /> 
        ))}
      </Sidebar>
      <section className="flex flex-col w-full">
        
        <Header 
          openSidebarClick={openSidebar} 
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={AILoading} />

        <Footer 
          disabled={AILoading}
          onSendMessage={handleSendMessage}
        />

      </section>
    </main>
  );
}

export default Page;
