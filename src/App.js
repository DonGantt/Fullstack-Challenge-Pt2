import { Grid } from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux"
import { selectUserData, selectUserPendingStatus, fetchUsers, sortBy, reverseSortBy } from './store/usersSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const isPending = useSelector(selectUserPendingStatus)
  const getUserData = useSelector(selectUserData)

  let userData = []

  //Calls the api call on initial render 
  useEffect(() => { 
    dispatch(fetchUsers())
  },[])

  //On page render it checks if the state of pending is false and if so, it allows you to store the state 
  if(isPending === false) {
    userData = getUserData
  }

  

  function getHeader() {
    var response = []

    //If the length of the data is not zero it will properly render out the information. It serves as an error check essentially
    if(userData.length !== 0){
      
 
        //We pull only one initially since we only want the keys (the column names), in order to create the header. This allows the header to be more flexible for other long term uses and become reusable.
        for (const key in userData[0]) {

          //Prevents unnecessary keys from being pulled from the object
          if(key !== "_id" && key !== "__v"){
            response.push(
            <Grid.Column key={key}>
            <button onClick={() => dispatch(sortBy(key))}>Sort by {key}</button>
            <button onClick={() => dispatch(reverseSortBy(key))}>Reverse Sort by {key}</button>
            {key}
            </Grid.Column>
          )}
        
      }
    } 
    return response
  }  

  function renderGridRow (allUserData){
    var renderedRow = []

    //Loops through all of the data pulled from the API
    for (let i = 0; i < allUserData.length; i++) {
      renderedRow.push(
        //Sends the individual user data pulled from the collective to get sorted into columns and then get returned back to the row
      <Grid.Row key={i}>       
        {renderGridColumn(allUserData[i])} 
      </Grid.Row>
      )
    }
    return renderedRow
  }
  
  function renderGridColumn(individualUserData){
    var renderedColumn = []

    //Loops through the individual user data passed through from renderGridRow.
    for(const key in individualUserData){
      
      //Prevents unnecessary keys from being pulled from the object
      if(key !== "_id" && key !== "__v"){

        renderedColumn.push(
        <Grid.Column key={key}>
          {individualUserData[key]}
        </Grid.Column>)
      }
    }
    return renderedColumn
  }
 
  return (
    <Grid 
    divided = {true}
    //Class name is to override the default container properties built into Grid because of scaling issues
    className='container containerWidth containerMaxWidth selectorOverride'
    //Checks if the array returned from getHeader is greater than zero and if not it will have a default of one. This prevents errors long term
    columns={getHeader().length > 0 ?  getHeader().length : 1}
    >
      <Grid.Row className='gridHeader'>
        {getHeader()}
      </Grid.Row>

      {renderGridRow(userData)}
    </Grid>
  )
}





export default App
