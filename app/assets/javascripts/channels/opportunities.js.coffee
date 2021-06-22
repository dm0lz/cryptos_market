@opportunities_subscription = ->
  App.cable.subscriptions.create { channel: "OpportunitiesChannel" },
    connected: ->
      console.log("connected to OpportunitiesChannel")
    received: (data) ->
      # console.log(data)
      d = new Date()
      n = d.toLocaleTimeString();
      $("#ws-notif").fadeOut("slow", ->
        $("#ws-notif").html("<article id='ws-notif'class='ws-n text-center alert alert-success'>Last Report was generated at : " + n + "</article>")
        $("#ws-notif").fadeIn("slow");
      )
      $("section.opportunities_table").html(data.opportunities)
