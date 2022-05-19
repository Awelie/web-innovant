import { supabase } from '../components/supabaseClient'

export async function LoadData() {
    let d = sessionStorage.getItem('dbData')
    if(!d) { // || ((new Date()) - d.time)/1000/60 > 30
        let data = await getData();
        sessionStorage.setItem('dbData', JSON.stringify(data))
    }
    //console.log(JSON.parse(sessionStorage.getItem('dbData')))
    return JSON.parse(sessionStorage.getItem('dbData'))
}

async function getData() {
    // eslint-disable-next-line no-unused-vars
    let { data: today, error: error_today } = await supabase
        .from('health_data')
        .select('*')
        .eq('id', supabase.auth.user().id)
        .eq('date', ((new Date()).toISOString()).toLocaleString('zh-TW'))
    if(today.length === 0) {
        // eslint-disable-next-line no-unused-vars
        const { data, error } = await supabase
              .from('health_data')
              .insert([
                {
                    id: supabase.auth.user().id,
                    date: ((new Date()).toISOString()).toLocaleString('zh-TW'),
                    sleeptime: Math.floor(Math.random()* 480),
                    stepsnumber: Math.floor(Math.random()* 12000),
                    ambiantvolume: Math.floor(Math.random()* 100),
                    globalscore: Math.floor(Math.random()* 100)
                },
              ])
    }
    // eslint-disable-next-line no-unused-vars
    let { data: users, error: error_users } = await supabase
        .from('users')
        .select('*')
      // eslint-disable-next-line no-unused-vars
      let { data: health_data, error: error_health } = await supabase
        .from('health_data')
        .select("*")
        .eq('id', supabase.auth.user().id)
    health_data.sort((a, b) => (new Date(b.date)) - (new Date(a.date)))

    return {
        user: users,
        data: health_data,
        time: new Date(),
        loaded: true,
    }
}