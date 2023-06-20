import { Chat } from "@/types/Chat";
import { useState } from "react";
import IconChatLeft from "./icons/IconChatLeft";
import IconTrash from "./icons/IconTrash";
import IconEdit3 from "./icons/IconEdit3";
import IconClose from "./icons/IconClose";
import IconCheck from "./icons/IconCheck";
import { on } from "events";

type Props = {
    chatItem: Chat;
    active: boolean;
    onClick: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
};

export const SidebarChatButton = ({ chatItem, active, onClick, onDelete, onEdit }: Props) => {
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(chatItem.title);

    const handleClickButton = () => {
        if (!deleting || !editing) onClick(chatItem.id);
    };
    const handleConfirmButton = () => {
        if (deleting) onDelete(chatItem.id);

        if (editing && newTitle.trim() !== '') {
            onEdit(chatItem.id, newTitle.trim());
        }

        setDeleting(false);
        setEditing(false);
    };
    const handleCancelButton = () => {
        setDeleting(false);
        setEditing(false);
    };


    return (
        <div onClick={handleClickButton} className={`flex items-center rounded-md p-3 text-sm cursor-pointer
        hover:bg-gray-500/10 ${active ? 'bg-gray-500/20' : 'bg-transparent'}`}>
            <div className="mr-3">
                {!deleting && <IconChatLeft width={16} height={16} />}
                {deleting && <IconTrash width={16} height={16} />}
            </div>

            <div className="flex-1 text-sm overflow-x-hidden">
                {editing && 
                    <input
                        className="w-full bg-transparent text-sm outline-none border border-blue-500"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                }
                {!editing && 
                    <div className="border border-transparent truncate">
                        {!deleting && chatItem.title}
                        {deleting && `Delete "${chatItem.title}"`}
                    </div>                    
                }
            </div>

            {active && !deleting && !editing && 
                <div className="flex">
                    <div onClick={() => setEditing(true)} className="cursor-point mx-1 opacity-60 hover:opacity-100">
                        <IconEdit3 width={16} height={16} />
                    </div>
                    <div onClick={() => setDeleting(true)} className="cursor-point mx-1 opacity-60 hover:opacity-100">
                        <IconTrash width={16} height={16} />
                    </div>
                </div>
            }

            {(deleting || editing) &&
            <div className="flex">
            <div onClick={handleConfirmButton} className="cursor-point mx-1 opacity-60 hover:opacity-100">
                <IconCheck width={16} height={16} />
            </div>
            <div onClick={handleCancelButton} className="cursor-point mx-1 opacity-60 hover:opacity-100">
                <IconClose width={16} height={16} />
            </div>
        </div>
            }

        </div>
    );
};