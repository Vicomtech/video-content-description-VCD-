import { VCD, ElementType, RDF } from '../vcd.core'
import * as types from '../vcd.types'

test('test_element_data_same_name', () => {
    let vcd = new VCD()

    let uid1 = vcd.addAction('', '#Walking')
    vcd.addActionData(uid1, new types.Boolean('validated', true), [0, 5])
    vcd.addActionData(uid1, new types.Boolean('occluded', false), [0, 5])
    vcd.addActionData(uid1, new types.Text('label', 'manual'), [0, 5])

    // Now try to add an Action Data with the same name
    vcd.addActionData(uid1, new types.Boolean('validated', false), [0, 5])

    // The initial 'validated' Boolean, with value true is substituted by false, instead of added
    //console.log(vcd.stringify(false))
    expect(vcd.stringify(false)).toBe('{"vcd":{"frames":{"0":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}},"1":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}},"2":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}},"3":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}},"4":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}},"5":{"actions":{"0":{"action_data":{"boolean":[{"name":"validated","val":false},{"name":"occluded","val":false}],"text":[{"name":"label","val":"manual"}]}}}}},"schema_version":"4.2.1","frame_intervals":[{"frame_start":0,"frame_end":5}],"actions":{"0":{"name":"","type":"#Walking","frame_intervals":[{"frame_start":0,"frame_end":5}],"action_data_pointers":{"validated":{"type":"boolean","frame_intervals":[{"frame_start":0,"frame_end":5}]},"occluded":{"type":"boolean","frame_intervals":[{"frame_start":0,"frame_end":5}]},"label":{"type":"text","frame_intervals":[{"frame_start":0,"frame_end":5}]}}}}}}')
});

test('test_element_data_nested_same_name', () => {
    let vcd = new VCD()

    let uid1 = vcd.addObject('mike', '#Pedestrian')
    let body = new types.Bbox('body', [0, 0, 100, 150])
    body.addAttribute(new types.Boolean('visible', true))
    body.addAttribute(new types.Boolean('occluded', false))
    body.addAttribute(new types.Boolean('visible', false))  // this is repeated, so it is substituted
    vcd.addObjectData(uid1, body, [0, 5])
      
    //console.log(vcd.stringify(false))
    expect(vcd.stringify(false)).toBe('{"vcd":{"frames":{"0":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}},"1":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}},"2":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}},"3":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}},"4":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}},"5":{"objects":{"0":{"object_data":{"bbox":[{"name":"body","val":[0,0,100,150],"attributes":{"boolean":[{"name":"visible","val":false},{"name":"occluded","val":false}]}}]}}}}},"schema_version":"4.2.1","frame_intervals":[{"frame_start":0,"frame_end":5}],"objects":{"0":{"name":"mike","type":"#Pedestrian","frame_intervals":[{"frame_start":0,"frame_end":5}],"object_data_pointers":{"body":{"type":"bbox","frame_intervals":[{"frame_start":0,"frame_end":5}],"attributes":{"visible":"boolean","occluded":"boolean"}}}}}}}')
});

/*
test('test_action_frame_interval_modification', () => {
    let vcd = new VCD()
    
    // Basic modification of element-level information, including frame-intervals
    let uid1 = vcd.addAction('Drinking_5', "distraction/Drinking", [[5, 10], [15, 20]])
    expect(vcd.getFrameIntervalsOfElement(ElementType.action, uid1)).toStrictEqual([{'frame_start': 5, 'frame_end': 10}, {'frame_start': 15, 'frame_end': 20}])

    // Usual "just-one-frame" update for online operation: internally updates frame interval using FUSION (UNION)
    vcd.updateAction(uid1, 21)
    expect(vcd.getFrameIntervalsOfElement(ElementType.action, uid1)).toStrictEqual([{'frame_start': 5, 'frame_end': 10}, {'frame_start': 15, 'frame_end': 21}])


    // Entire modification with potential removal and extension
    vcd.modifyAction(uid1, null, null, [[5, 11], [17, 20]])  // adding 11, and deleting 15, 16 and 21
    expect(vcd.getFrameIntervalsOfElement(ElementType.action, uid1)).toStrictEqual([{'frame_start': 5, 'frame_end': 11}, {'frame_start': 17, 'frame_end': 20}])

    
    // Complex modification of element_data level information    
    vcd.addActionData(uid1, new types.Text('label', 'manual'), [[5, 5], [11, 11], [20, 20]])
    vcd.stringify(false)
/*    vcd.modifyActionData(uid1, new types.Text('label', 'auto'), [[11, 11]]) 
        
    expect(vcd.getActionData(uid1, 'label', 5)['val']).toBe('manual')    
    expect(vcd.getActionData(uid1, 'label', 10)['val']).toBe('auto')    
    expect(vcd.getActionData(uid1, 'label', 20)['val']).toBe('manual')

    // Element-data can't go BEYOND elements limits -> error/warning is sent
    vcd.addActionData(uid1, new types.Boolean('label', 'manual'), [[5, 25]])
    expect(vcd.getFrameIntervalsOfElement(ElementType.action, uid1)).toStrictEqual([{'frame_start': 5, 'frame_end: 11'}, {'frame_start': 15, 'frame_end': 21}])

    // Note: any further modification of Action also modifies (e.g. removes) any actionData
    vcd.modifyAction(uid1, null, null, [[5, 11], [15, 19]])  // removing frames 20 and 21, then removes entry of 'label' action data from frame 20 which does not exist now
    expect(vcd.getFrameIntervalsOfElement(ElementType.action, uid1)).toBe([{'frame_start': 5, 'frame_end: 11'}, {'frame_start': 15, 'frame_end': 19}])
    expect(vcd.getActionData(uid1, 'label', 20)).toBe({})  // getActionData return {} if not found
    
});*/

// TODO: test modify Relation also