import React, { useState, useEffect } from 'react'
import { Box, Heading, Tab, Tabs, Button } from 'grommet'
import {Atoms, Molecules} from '@tattle-made/ui'
const {EditableText, EditableEnum, EditableDate, EditableDateRange, EditableNumber, EditableLocationCoord} = Molecules

var textData = {'id':1, 'type':'text', 'label':'Author Name', 'value':'Manoj Shahidharan', 'author':100};

/**
* @author denny
* @function MetadataTabFactCheckService
**/

const MetadataTabTattle = () => {
    const [fetching, setFetching] = useState(false)
    const [currentData, setCurrentData] = useState(textData)
    const updateData = (data) => setCurrentData(data)

    console.log('--molecule--')
    console.log(Molecules)

    useEffect(()=> {
        setFetching(true)
    })

    return (
        <Box margin={{top:'small'}}>
            <Heading level={2}> Tattle Fields </Heading>
            <EditableText data={textData} updateCallback={updateData} />
        </Box>
    )
}

export default MetadataTabTattle