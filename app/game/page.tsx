import { useTranslation } from "react-i18next";
import ContainerWithLoading from "../../components/ContainerWithLoading/ContainerWithLoading";

export default function Game() {
  const { t: t_toast } = useTranslation('toast')
  // no filepath - usage example
  
  return (
    <ContainerWithLoading loadingState={false} errMessage={t_toast('info.noData')}>
      <></>
    </ContainerWithLoading>
  )
}
