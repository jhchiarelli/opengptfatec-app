import IconAlertTriangle from "./icons/IconAlertTriangle";
import IconBolt from "./icons/IconBolt";
import IconSunTwentyFour from "./icons/IconSunTwentyFour";

export const ChatPlaceholder = () => {
    return(
        <div className="m-5">
            <h3 className="text-4xl font-bold text-center my-8">Fatec GPT</h3>
            <div className="flex flex-col md:flex-row gap-5 m-auto mb-8 md:max-w-4xl">

                <div>
                    <div className="flex flex-col justify-center items-center text-lg mb-3">
                        <IconSunTwentyFour width={24} height={24} className="mr-3 mb-3" />
                        Exemplo
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Pergunte o que é TCP/IP</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">O que é Internet</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">O Seja criativo!</div>
                </div>

                <div>
                    <div className="flex flex-col justify-center items-center text-lg mb-3">
                        <IconBolt width={24} height={24} className="mr-3 mb-3" />
                        Capacidades
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Lembra do que o usuário disse anteriormente na conversa.</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Automatiza processos</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Ensina idiomas</div>
                </div>

                <div>
                    <div className="flex flex-col justify-center items-center text-lg mb-3">
                        <IconAlertTriangle width={24} height={24} className="mr-3 mb-3" />
                        Limitações
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Pode ocasionalmente gerar informações incorretas.</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Informações desatualizadas</div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">Mais uma porção de coisas</div>
                </div>

            </div>
        </div>
    );
};