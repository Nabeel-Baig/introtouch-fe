import React, { useState } from 'react';
import TechCard from './TechCard';
import AddTechCard from './AddTechCard'
import EditTechCard from './EditTechCard'


const TechCards = ({ edit,userProfile }) => {
  const [isHidden, setHidden] = useState(true);
  const [isHiddenEdit, setHiddenEdit] = useState(true);
  const [category, setCategory] = useState(undefined);
  const [service, setService] = useState(undefined);

  const onClickAddService = (category)=>{
    setCategory(category)
    setHidden(false)
  }
  const onClickClose = ()=>{
    setCategory(undefined)
    setHidden(true)
  }
  const onClickEditService = (selectedService)=>{
    setService(selectedService)
    setHiddenEdit(false)
  }
  const onClickCloseEdit = ()=>{
    setService(undefined)
    setHiddenEdit(true)
  }
  return (
    <div id="techCards" className="space-y-7">
      <div>
      <AddTechCard hidden={isHidden} category={category} onClickClose={onClickClose} />
      <EditTechCard hidden={isHiddenEdit} service={service} onClickClose={onClickCloseEdit} />
      </div>
      {userProfile.services.map((el, i) => (
        <TechCard userId={userProfile?.userId} data={el} key={i} edit={edit} onClickAddService={onClickAddService} onClickEditService={onClickEditService} />
      ))}
    </div>
  );
};

export default TechCards;
