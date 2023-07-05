import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function useSearchForm() {
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    const stateSelect = document.querySelector("#sel1");
    const typeSelect = document.querySelector("#sel2");
    const categorySelect = document.querySelector("#sel3");
    const investmentSelect = document.querySelector("#sel4");
    const stateValue = stateSelect.value;
    const typeValue = typeSelect.value;
    const categoryValue = categorySelect.value;
    const investmentValue = investmentSelect.value;
    navigate(`?s=${stateValue}&c=${typeValue}&t=${categoryValue}&v=${investmentValue}`);
  }, [navigate]);

  return handleSearch;
}
export default useSearchForm;